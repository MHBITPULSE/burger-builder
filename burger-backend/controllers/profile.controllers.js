const _ = require('lodash')

const { Profile } = require('../models/profile.model')

module.exports.getProfile = async (req, res) => {
      const profile = await Profile.findOne({ user: req.user._id })
      return res.status(200).send(profile)
}

module.exports.setProfile = async (req, res) => {
      let data = { ...req.body, user: req.user._id }

      let profile = await Profile.findOne({ user: req.user._id })
      console.log(profile)

      if (profile) await Profile.updateOne({ user: req.user._id }, data)
      else {
            profile = new Profile(data);
            const result = await profile.save();
      }

      return res.status(200).send("Profile Updated")
}