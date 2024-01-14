const checkExtention = (fileName) => {
  const EXTENSIONS = ['pdf', 'docx', 'txt', 'xlsx'];
  const splitedFileName = fileName.split('.');
  const extension = splitedFileName.pop();

  return {
    extension,
    result: EXTENSIONS.includes(extension),
  };
};

export default checkExtention;
