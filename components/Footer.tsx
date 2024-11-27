import Container from "./Container";

const Footer = () => {
  return (
    <footer className="mt-6 mb-8" >
      <Container className="flex justify-between gap-4" >
       <p>Invoicopedia &copy; { new Date().getFullYear()}</p>
       <p className="text-sm">
        Created by  Hamza Asif Hijazi Wtih Next.js, XATA and Clerk
         </p>
      </Container>
    </footer>
  );
};
export default Footer;
