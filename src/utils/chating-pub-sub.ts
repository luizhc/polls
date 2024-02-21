class Chat {
  private connections: Record<string, Set<any>> = {};

  connect(chatId: string, connection: any) {
    if (!this.connections[chatId]) {
      this.connections[chatId] = new Set();
    }
    this.connections[chatId].add(connection.socket);
    console.log(`connected in chat ${chatId}`);
  }

  stream(chatId: string, connection: any, message: any) {
    let handledMessage;

    try {
      handledMessage = JSON.parse(message);
    } catch (error) {
      handledMessage = String(message);
    }

    const response = JSON.stringify(handledMessage);

    for (const socket of this.connections[chatId]) {
      if (socket !== connection.socket && socket.readyState === socket.OPEN) {
        socket.send(response);
      }
    }

    console.log(`streamed in chat ${chatId}`, response);
  }

  disconnect(chatId: string, connection: any) {
    this.connections[chatId].delete(connection.socket);
    console.log(`disconnected in chat ${chatId}`);
    if (this.connections[chatId].size === 0) {
      delete this.connections[chatId];
      console.log(`no connection in chat ${chatId}`);
    }
  }
}

export const chating = new Chat();
