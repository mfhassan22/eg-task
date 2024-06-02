type LoginSectionProps = {
  children: React.ReactNode
}
const LoginSection = (props: LoginSectionProps) => {
  return (
    <div className="bg-gray-300 text-black py-20 px-10 h-screen">
      <div className="container mx-auto flex flex-col md:flex-row items-center h-full">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl font-bold mb-5">API: {import.meta.env.VITE_API_BASE_URL}</h1>
          <p className="text-lg">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        </div>
        <div className="md:w-1/2 lex items-center">
          {
            props.children
          }
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
