"use strict";

const joi = require('joi');

exports.Model = {
  _key: joi.string().optional(),
  _id: joi.string().optional(),
  _rev: joi.string().optional(),
  completed: joi.boolean().optional(),
  order: joi.number().optional(),
  title: joi.string().optional()
};
