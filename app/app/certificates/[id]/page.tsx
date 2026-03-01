export default async function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Certificate {id}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Verifiable credential NFT — view on-chain proof of completion.
      </p>
    </div>
  );
}
