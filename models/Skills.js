const mongoose = require('mongoose');

/*
**  SKILLS:
**  
**  
*/

const Skills = new mongoose.Schema({

});

/*
**  SOFTSKILLS:
**
**  Adaptability 
**  Communication 
**  Creative thinking
**  Dependability
**  Work ethic 
**  Teamwork
**  Positivity 
**  Time management 
**  Motivation 
**  Problem-solving 
**  Critical thinking
**  Conflict resolution
*/

const SoftSkills = new mongoose.Schema({

});

/*
**  Relacionar con el concepto de una transaccion, cada vez que ganas un 
**  token el que te esta dando el token es el que te puede validar una skill
**  ver cuales son las skills
*/

const SkillsSchema = new mongoose.Schema({
    skills: {
        type: Skills
    },
    softSkills: {
        type: SoftSkills
    }
});

module.exports = mongoose.model('Skills', SkillsSchema);