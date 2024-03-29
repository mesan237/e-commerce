const UserListScreen = () => {
  return (
    <div>
      <p className="mb-4 font-bold h3">List of Users</p>
      {/* {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.data.message || error.error}
          </AlertDescription>
        </Alert>
      )}
      {isLoading && <Spinner> Loading...</Spinner>} */}
    </div>
  );
};

export default UserListScreen;
