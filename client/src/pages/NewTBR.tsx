import { TBRComponent } from '../components/TBRComponent';

export function NewTBRPage() {
  return (
    <div className="bg-space-cadet pb-10 pt-10">
      <TBRComponent />
      <div className="save p-10">
        <button className="btn bg-fire-engine-red text-anti-flash-white">
          Save
        </button>
      </div>
    </div>
  );
}
