<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework 
사용자를 위한 @nestjs/schedule 확장 모듈 배치 실행을 데이터베이스에 저장한다. 

## Installation

```bash
$ npm install --save @jhkang/scheduler-db
```

## Test

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov
```

## Usage
```typescript
import { SchedulerDBModule } from '@jhkang/nestjs-scheduler-db'

@Module({
  imports : [
    SchedulerDBModule.forRoot({
      database : {

      }, 
      scheduler : {

      }
    })
  ]
})
export class AppModule {}
```
```typescript
import { CronWithDB } from '@jhkang/nestjs-scheduler-db'
@Injectable()
export class ExampleScheduler {
  constructor (
    private readonly service : ExampleService
  )

  @CronWithDB(cronTime : '0 0 * * *')
  myScheduler() {
    const resultA = this.service.activeA();
    const resultB = this.service.activeB(resultA);
  }
}
```
```typescript
import { CronStep } from '@jhkang/nestjs-scheduler-db'
@Injectable() 
export class ExampleService {

  @CronStep()
  activeA() {
    return 1;
  }

  @CronStep()
  activeB(num:number) {
    return num * 2;
  }
}
```

## License
[MIT licensed](LICENSE).
