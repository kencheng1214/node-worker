export interface ExecutionContext {}

export interface Plugin {
  execute(context: ExecutionContext);
}
