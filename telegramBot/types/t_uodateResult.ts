export default interface t_uodateResult {
  ok: boolean;
  result: {
    update_id: number;
    message: {
      message_id: 5742;
      from: {
        id: number;
        first_name: string;
        last_name: string;
        username: string;
      };
      text: string;
    };
  }[];
}
