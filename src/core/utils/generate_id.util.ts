import { InternalServerErrorException } from "@nestjs/common";
import { Types } from "mongoose";

export default function generateObjectId(id: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(id)) {
        throw new InternalServerErrorException("Invalid id.");
    }

    return new Types.ObjectId(id);
};