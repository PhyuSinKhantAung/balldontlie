import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1>Hello World</h1>
      <Button>Click me</Button>
      <p className="max-w-md font-nunito">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed dolores
        facere aperiam fuga? Porro culpa libero commodi, et aliquam provident
        accusamus voluptates tempore itaque repellat veritatis sapiente ducimus
        ipsa minima!
      </p>
    </div>
  );
}
