const ClassRoom = class {
  static getAll() {
    return new Promise((resolve, reject) => {
      resolve(['SCRUM', 'JAVA', 'PHP', 'C#', 'PYTHON']);
    });
  }
};

module.exports = ClassRoom;
