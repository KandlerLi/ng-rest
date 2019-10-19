import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TestSubObject } from './test-sub-object';

export class TestObject {
    @IsString()
    public id: string;

    @IsNumber()
    public age: number;

    @ValidateNested()
    @Type(() => TestSubObject)
    public name: TestSubObject;
}

