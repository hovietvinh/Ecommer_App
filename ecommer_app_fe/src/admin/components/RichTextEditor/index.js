import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function RichTextEditor({handleEditorChange,editorContent}) {
  // console.log(editorContent);

  return (
    <div>
      <Editor
        apiKey='izl72j5zg9fjcr0551e6p3vrd6gpctfwcer7okoq9iqtsxk4'
        value={editorContent}
        init={{
          height: 400,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
}

export default RichTextEditor;
