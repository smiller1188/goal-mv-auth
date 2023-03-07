const Goal = require('../models/Goal')

module.exports = {
    getGoals: async (req,res)=>{
        console.log(req.user)
        try{
            const goalItems = await Goal.find({userId:req.user.id})
            const itemsLeft = await Goal.countDocuments({userId:req.user.id,completed: false})
            res.render('goals.ejs', {goals: goalItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createGoal: async (req, res)=>{
        try{
            await Goal.create({goal: req.body.goalItem, completed: false, userId: req.user.id})
            console.log('Goal has been added!')
            res.redirect('/goals')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Goal.findOneAndUpdate({_id:req.body.goalIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Goal.findOneAndUpdate({_id:req.body.goalIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteGoal: async (req, res)=>{
        console.log(req.body.goalIdFromJSFile)
        try{
            await Goal.findOneAndDelete({_id:req.body.goalIdFromJSFile})
            console.log('Deleted Goal')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    
