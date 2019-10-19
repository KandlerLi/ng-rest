import { IsString } from 'class-validator';

export class TestSubObject {
    @IsString()
    public firstName: string;

    @IsString()
    public lastName: string;
}