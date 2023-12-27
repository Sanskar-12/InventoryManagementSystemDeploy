import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  dashboard: {
    all: {
      type: Boolean,
      default: false,
    },
    view: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    add: {
      type: Boolean,
      default: false,
    },
    delete: {
      type: Boolean,
      default: false,
    },
    import: {
      type: Boolean,
      default: false,
    },
    export: {
      type: Boolean,
      default: false,
    },
  },
  inventory: {
    access: {
      orderDetails: {
        type: Boolean,
        default: false,
      },
      categories: {
        type: Boolean,
        default: false,
      },
      orders: {
        type: Boolean,
        default: false,
      },
      orderArchive: {
        type: Boolean,
        default: false,
      },
    },
    all: {
      type: Boolean,
      default: false,
    },
    view: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    add: {
      type: Boolean,
      default: false,
    },
    delete: {
      type: Boolean,
      default: false,
    },
    import: {
      type: Boolean,
      default: false,
    },
    export: {
      type: Boolean,
      default: false,
    },
  },
  inward: {
    access: {
      inward_all: {
        type: Boolean,
        default: false,
      },
      inward_archive: {
        type: Boolean,
        default: false,
      },
    },
    all: {
      type: Boolean,
      default: false,
    },
    view: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    add: {
      type: Boolean,
      default: false,
    },
    delete: {
      type: Boolean,
      default: false,
    },
    import: {
      type: Boolean,
      default: false,
    },
    export: {
      type: Boolean,
      default: false,
    },
  },
  requisition: {
    all: {
      type: Boolean,
      default: false,
    },
    view: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    add: {
      type: Boolean,
      default: false,
    },
    delete: {
      type: Boolean,
      default: false,
    },
    import: {
      type: Boolean,
      default: false,
    },
    export: {
      type: Boolean,
      default: false,
    },
  },
  institute_management: {
    all: {
      type: Boolean,
      default: false,
    },
    view: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    add: {
      type: Boolean,
      default: false,
    },
    delete: {
      type: Boolean,
      default: false,
    },
    import: {
      type: Boolean,
      default: false,
    },
    export: {
      type: Boolean,
      default: false,
    },
  },
  order_generation: {
    access: {
      work_Order: {
        type: Boolean,
        default: false,
      },
      work_Order_List: {
        type: Boolean,
        default: false,
      },
      contract_Order: {
        type: Boolean,
        default: false,
      },
      contract_Order_List: {
        type: Boolean,
        default: false,
      },
      purchase_Order: {
        type: Boolean,
        default: false,
      },
      purchase_Order_List: {
        type: Boolean,
        default: false,
      },
      vendor_Master_Form: {
        type: Boolean,
        default: false,
      },
      vendor_Master_Form_List: {
        type: Boolean,
        default: false,
      },
    },
    all: {
      type: Boolean,
      default: false,
    },
    view: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    add: {
      type: Boolean,
      default: false,
    },
    delete: {
      type: Boolean,
      default: false,
    },
    import: {
      type: Boolean,
      default: false,
    },
    export: {
      type: Boolean,
      default: false,
    },
  },
  institute_management_access: {
    type: String,
    
  },
  departmet_management_acess:[{
    type: String,
    
  }],
  labs_management_acess:[{
    
      department:String,
      labs:[{LabNo:Number,FloorNo:Number}]
    
    
  }],

  user_access_role: {
    type: String,
    required: true,
  },

  user_detail: {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    contact_number: {
      type: String,
      required: true,
    },
    email_id: {
      type: String,
      required: true,
    },
    user_type: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// institute_id: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "Institute",
// },

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.user_detail.password = await bcrypt.hash(
      this.user_detail.password,
      10
    );
  }

  next();
});

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

userSchema.methods.MatchPassword = async function (password) {
  return await bcrypt.compare(password, this.user_detail.password);
};

export const User = mongoose.model("User", userSchema);
