import { Expose } from 'class-transformer'
import { IsDefined, Matches, MaxLength, MinLength, ValidationArguments } from 'class-validator'

export default class UserDTO {
   @IsDefined({
      message: 'Username is required.'
   })
   @Expose()
   @Matches(RegExp(/^[a-z0-9_-]{3,16}$/), {
      message: 'Enter a valid username.'
   })
   username: string

   @IsDefined()
   @Expose()
   @Matches(RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/), {
      message: 'The password is not strong.'
   })
   password: string

   @IsDefined({
      message: 'Email is required.'
   })
   @Expose()
   @Matches(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      {
         message: 'Enter a valid email.'
      }
   )
   email: string

   @IsDefined({
      message: 'Name is required.'
   })
   @Expose()
   @MinLength(3, {
      message: 'The name has to have at least 3 words.'
   })
   @MaxLength(20, {
      message: 'The name could involve a maximum of 20 words.'
   })
   name: string
}
