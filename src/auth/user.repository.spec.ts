import {Test} from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { ConflictException } from '@nestjs/common';


const mockCredentialsDto={

   username:'Test username',
   password:'Test password'

}


describe('UserRepository',()=>{

    let userRepository;

    beforeEach(async ()=>{

        const module=await Test.createTestingModule({

        providers: [
            UserRepository
        ]

        }).compile()

userRepository=await module.get<UserRepository>(UserRepository)

    })

    describe('signUp',()=>{

let save;

beforeEach(()=>{
    
 save=jest.fn()
 
 userRepository.create = jest.fn().mockReturnValue({save})

})


    it('successfully signs up user', ()=>{


save.mockResolvedValue(undefined)

expect(userRepository.signUp(mockCredentialsDto)).resolves.not.toThrow()


    })   

it('successfully signs up the user',()=>{
   save.mockResolvedValue(undefined)
   expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(ConflictException) 
})

it('throws conflictException as user already exists',()=>{
    save.mockResolvedValue({code:'23505'})
    expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(ConflictException) 
 })


    })


})