
import ComponentCard from "../../components/common/ComponentCard";
import ProductTable from "../../components/tables/DataTableOne/ProductTable";
import PageMeta from "../../components/common/PageMeta";


export default function ProductsPage() {
  return (
    <>
      <PageMeta
        title="Dashboard | Products List"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="space-y-6">
        <ComponentCard title="Products List">
          <ProductTable />
        </ComponentCard>
      </div>
    </>
  );
}
