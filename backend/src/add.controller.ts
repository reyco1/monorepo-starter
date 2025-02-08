import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '@reyco1/nestjs-firebase';

@Controller('api/v1')
export class AddController {

  @Get('calculate')
  @UseGuards(FirebaseAuthGuard)
  calculate(@Query('expression') expression: string) {
    if (!expression) {
      return { error: 'Expression is required' };
    }

    try {
      // Remove any whitespace and validate characters
      const sanitizedExpression = expression.replace(/\s/g, '');
      if (!/^[0-9+\-*/().]+$/.test(sanitizedExpression)) {
        return { error: 'Invalid characters in expression' };
      }

      // Use Function constructor to evaluate the expression
      // This is safer than eval() as it runs in a separate scope
      const result = new Function(`return ${sanitizedExpression}`)();

      if (typeof result !== 'number' || !isFinite(result)) {
        return { error: 'Invalid calculation result' };
      }

      return { result };
    } catch (error) {
      console.error('Calculation error:', error);
      return { error: 'Invalid expression' };
    }
  }
}
