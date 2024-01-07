const Page = async ({ params: {userID} }) => {
  return (
    <div>
      <h1>Ini profile page</h1>
      <h1>user id = {userID}</h1>
    </div>
  );
};

export default Page;
