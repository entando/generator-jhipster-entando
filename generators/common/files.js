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

function writeFiles() {
  return {
    writeEntandoFiles() {
      this.writeFilesToDisk(commonFiles, this, false, null);
    },
  };
}

module.exports = {
  writeFiles,
  commonFiles,
};
