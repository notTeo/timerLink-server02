import mongoose, { Schema, Document, Model } from "mongoose";
import { TargetDocument } from "./targetSchema";
import { UserDocument } from "./userSchema";

interface LinkGroupDocument extends Document {
  name: string;
  userId: UserDocument["_id"];
  targets: Array<TargetDocument["_id"]>;
}

const linkGroupSchema: Schema = new Schema({
  name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  targets: [{ type: Schema.Types.ObjectId, ref: "Target" }],
});

const LinkGroup: Model<LinkGroupDocument> = mongoose.model<LinkGroupDocument>(
  "LinkGroup",
  linkGroupSchema,
);

export { LinkGroup, LinkGroupDocument };
