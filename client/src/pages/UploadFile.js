import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { Form, Button } from 'react-bootstrap';

const UPLOAD_FILE = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      path
    }
  }
`;

const UploadFile = () => {
  const [file, setFile] = useState();

  const [uploadFile, { error }] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log(data),
  });

  console.log('error', JSON.stringify(error));

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('file', file);
    uploadFile({ variables: { file } });
  };

  return (
    <>
      <h1>Upload File</h1>
      <Form onSubmit={handleSubmit}>
        <Form.File
          id='upload-file'
          label='Upload File'
          custom
          type='file'
          onChange={handleChange}
        />
        <br />
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default UploadFile;
