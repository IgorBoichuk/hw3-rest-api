const express = require("express");
const { NotFound } = require("http-errors");
const Joi = require("joi");
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const Contact = require("../../models/contact");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await Contact.find();
  try {
    res.json({
      code: 200,
      data: {
        result: result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId: id } = req.params;

    const result = await Contact.findById({ _id: id });
    if (!result) {
      throw new NotFound(`Contact id ${id} not found`);
    }
    res.json({
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await Contact.create(req.body);
    res.status(201).json({
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  // res.json({ message: "template message" });
  try {
    const { contactId } = req.params;
    const result = await Contact.findOneAndDelete({ _id: contactId });
    if (!result) {
      throw new NotFound(`Contact with id ${contactId} not found`);
    }
    res.json({
      code: 200,
      message: `Contact deleted ${contactId}`,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  // res.json({ message: "template message" });
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body);
    if (!result) {
      throw new NotFound(`Contact with id ${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    const { error } = Contact.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const { favorite } = req.body;
    try {
      const result = await Contact.findByIdAndUpdate(
        contactId,
        { favorite },
        { new: true }
      );
      res.json({
        status: "success",
        code: 200,
        data: {
          result,
        },
      });
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        throw new NotFound(`Contact with id ${contactId} not found`);
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
