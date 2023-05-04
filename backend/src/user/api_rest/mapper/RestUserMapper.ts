import { UserRequestDto } from './../../domain/dto/UserRequestDto';
import { Mapper } from "ts-mapstruct";
import { UserEntity } from "../../domain/entity/UserEntity";

@Mapper()
export class RestUserMapper{
  toEntity(userRequestDto: UserRequestDto): UserEntity {
    const userEntity = new UserEntity();
    Object.assign(userEntity, userRequestDto);
    return userEntity;
  }
  toOrm(userEntity: UserEntity): UserRequestDto {
    const userRequestDto = new UserRequestDto();
    Object.assign(userRequestDto, userEntity);
    return userRequestDto;
  }
}