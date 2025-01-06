import csIcon from '@client/assets/cs-icon.svg';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full animate-spin">
      <img src={csIcon} alt="Credit Score Logo" className="w-10 h-10" />
    </div>
  );
}
