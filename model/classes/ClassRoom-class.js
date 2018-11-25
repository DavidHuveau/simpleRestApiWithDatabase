require('babel-register');

const ClassRoom = class {
    static getAll() {
        return ["SCRUM", "JAVA", "PHP", "C#", "PYTHON"];
    }
}

module.exports = ClassRoom;
