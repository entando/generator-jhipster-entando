const commonFiles = {
  global: [
    {
      templates: [
        {
          file: 'gitignore',
          renameTo: () => '.gitignore',
        },
      ],
    },
  ],
};

function writeCommonFiles() {
  this.writeFilesToDisk(commonFiles, this, false, null);
}

module.exports = {
  writeCommonFiles,
  commonFiles,
};
