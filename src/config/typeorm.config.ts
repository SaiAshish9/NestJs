
import {TypeOrmModuleOptions} from '@nestjs/typeorm'

import "reflect-metadata"

export const typeOrmConfig: TypeOrmModuleOptions ={

  type:'postgres',
  host:'localhost',
  port: 5432,
  username:'postgres',
  password:'shirdisai',
  database:'taskmanagement',
  entities:[__dirname +'/../**/*.entity{.ts,.js}'],
  synchronize:true,
  logging:false


}