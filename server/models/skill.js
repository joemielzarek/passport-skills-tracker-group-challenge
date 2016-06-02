var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SkillSchema = new Schema({
    skill: {type: String, required: true, index: {unique: true}},
    years: {type: String, required: true},
    user: {type: String, required: true}
});

var Skill = mongoose.model('Skill', SkillSchema);

module.exports= Skill;
