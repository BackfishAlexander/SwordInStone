import { ApiProperty } from "@nestjs/swagger";

export class registerDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}