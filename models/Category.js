const mongoose = require('mongoose');
const slugify = require('slugify');


const categorySchema = new mongoose.Schema(
  {
    name: {
      type: Object,
      required: true,
    },
    description: {
      type: Object,
      required: false,
    },
    shortDescription: {
      type: Object,
      required: false,
    },
    tagline: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      required: false,
    },
    parentId: {
      type: String,
      required: false,
    },
    parentName: {
      type: String,
      required: false,
    },
    id: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      lowercase: true,
      enum: ['show', 'hide'],
      default: 'show',
    }
  },
  {
    timestamps: true,
  }
);

// module.exports = categorySchema;


categorySchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    next();
    return;
  }

  this.slug = slugify(this.name.en, { lower: true, strict: true });
  next();
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
