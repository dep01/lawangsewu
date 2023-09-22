import React, { useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import "./style.css";
registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginFileValidateType
);

const UploadFile = ({ onImageUpload, file }) => {
  // const [file, setFile] = useState(null);
  let renderer_file = file;
  // const accept_type = ["png", "jpg", "jpeg"];
  // const getFileExtension = (filename) => {
  //   // console.log(filename);
  //   return !filename
  //     ? false
  //     : filename?.source?'png': filename
  //         .slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
  //         .toLowerCase();
  // };
  // const is_allow = accept_type.includes(getFileExtension(renderer_file));
  // if (!is_allow) {
  //   renderer_file = null;
  // }

  const handleFileLoad = (file) => {
    // console.log(file);
    if(file==null){
      onImageUpload(null);
      return;
    }
    try {
      const reader = new FileReader();

      // console.log(file);
      // if(file){
      reader.onloadend = () => {
        const base64String = reader.result;
        onImageUpload(base64String);
      };
      reader.readAsDataURL(file);
    } catch (error) {}
    // }
  };
  return (
    <div>
      <FilePond
        allowFileTypeValidation={true}
        acceptedFileTypes={['image/png', 'image/jpeg','image/jpg']}
        labelIdle="Input file type image"
        files={renderer_file ? [renderer_file] : []}
        onupdatefiles={(fileItems) => {
          const selectedFile =
            fileItems && fileItems.length > 0 ? fileItems[0].file : null;
          handleFileLoad(selectedFile);
        }}
      />
    </div>
  );
};

export default UploadFile;
