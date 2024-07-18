import { ObjectId } from "mongoose";

export class CreateFileDto {
    public name: string;

    public url: string;

    static fromFormData(name: string, url: string) {
        const file = new CreateFileDto();

        file.name = name;
        file.url = url;

        return file
    }
}

export class ResponseFileDto {
    public id: string;

    public name: string;

    public url: string;

    static fromObjectToData(id: string, name: string, url: string) {
        const file = new ResponseFileDto();

        file.id = id;
        file.name = name;
        file.url = url;

        return file
    }
}
