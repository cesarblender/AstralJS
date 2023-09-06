export function AppBar() {
  return (
    <div>
      <div className="w-full h-16 bg-gray-950 fixed backdrop-blur-sm bg-opacity-60 top-0 flex items-center px-2">
        <div className="container mx-auto flex items-center justify-between">
          <h2 className="font-bold text-2xl text-fuchsia-100 flex items-center gap-1">
            <img src="/favicon.ico" className="h-8" />
            AstralJS
          </h2>
          <a
            href="https://github.com/seokkuuu/AstralJS/wiki/Getting-Started"
            target="_blank"
            className="bg-fuchsia-200 text-black font-semibold rounded-lg p-2"
          >
            AstralJS Wiki
          </a>
        </div>
      </div>
      <div className="w-full h-16"></div>
    </div>
  );
}
