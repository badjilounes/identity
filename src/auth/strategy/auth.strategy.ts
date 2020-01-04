import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { jwtConstants } from '../model/jwt.const';
import { User } from '../../users/user.entity';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'auth') {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),     
      ignoreExpiration: false, 
      secretOrKey: jwtConstants.secret, 
    });
  }

  async validate(payload: any): Promise<User> {
    const user: User = await this.authService.validate(payload.id);
    
    if (!user) {
      throw new UnauthorizedException(); 
    }

    return user;
  }
}