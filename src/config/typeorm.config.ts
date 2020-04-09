
import {TypeOrmModuleOptions} from '@nestjs/typeorm'

  import { Task } from 'src/tasks/task.entity'
import { User } from 'src/auth/user.entity'

export const typeOrmConfig: TypeOrmModuleOptions ={

  type:'postgres',
  host:'localhost',
  port: 5432,
  username:'postgres',
  password:'shirdisai',
  database:'taskmanagement',
  entities:[User,Task],
  synchronize:true,
  logging:false


}