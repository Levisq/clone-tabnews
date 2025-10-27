//test.only vc roda apenas o test que foi colocado o .only

test("GET to api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.update_at).toBeDefined();
  
  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdateAt)

  //version
  const dbVersion = responseBody.db_version;
  expect(dbVersion).toEqual('PostgreSQL 18.0 on x86_64-pc-linux-musl, compiled by gcc (Alpine 14.2.0) 14.2.0, 64-bit')
  expect(dbVersion).not.toBeNull()

  //maxconnect
  const dbMaxConnect = parseInt(responseBody.db_max_connections, 10);
  expect(dbMaxConnect).toEqual(100);
  expect(dbMaxConnect).not.toBeNull()

  //usedconnection
  const dbUsedConnections = responseBody.db_used_connections;
  expect(dbUsedConnections).toBeLessThan(parseInt(dbMaxConnect, 10))
  expect(dbUsedConnections).not.toBeNull()
})