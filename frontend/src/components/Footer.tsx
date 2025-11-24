export default function Footer() {
  return (
    <footer className="border-t bg-white mt-12">
      <div className="container-max mx-auto py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} — Projeto MMA. Feito com disciplina.
      </div>
    </footer>
  );
}
