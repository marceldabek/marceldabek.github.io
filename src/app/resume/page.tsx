import BlurFade from "@/components/magicui/blur-fade";
import PdfViewer from "@/components/pdf-viewer";

const PDF_PATH = "/resume/dabek-resume-latest.pdf";

export default function ResumePage() {
  return (
    <main className="w-full max-w-4xl mx-auto space-y-8">
      <BlurFade delay={0}>
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-center -mt-4">
          Resume
        </h1>
      </BlurFade>
      <BlurFade delay={0.1}>
        <PdfViewer src={PDF_PATH} />
      </BlurFade>
    </main>
  );
}
