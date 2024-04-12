import { IsString,MinLength,MaxLength, Matches } from "class-validator";
import { Unique } from "typeorm";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(5)
    @MaxLength(25)
    username:string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{6,64}$/gm, {
        message:
            'Password must be between 6 and 64 characters long with 1 special character and capital character each',
    })
    password:string;
}