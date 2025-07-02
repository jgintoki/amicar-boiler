import { Logger } from '@nestjs/common';

export class DefaultLogger extends Logger {
  constructor(name?: string) {
    super(`[Boiler-Backend] ${name}`);
  }

  init(object: { message: string; objects: Record<string, unknown> }) {
    super.log({
      ...object,
      message: `🚀🚀🚀 (INIT) ${object.message}`,
    });
  }

  end(object: { message: string; objects: Record<string, unknown> }) {
    super.log({
      ...object,
      message: `😍😍😍 (END) ${object.message}`,
    });
  }

  error(object: { message: string; stack?: string; context?: string }) {
    super.error({
      ...object,
      message: `😿😿😿 (ERROR) ${object.message}`,
    });
  }
  processEnd(object: { message: string; objects: Record<string, unknown> }) {
    super.log({
      ...object,
      message: `❤️‍🔥❤️‍🔥❤️‍🔥 (END) (PROCESS)${object.message}`,
    });
  }
}
