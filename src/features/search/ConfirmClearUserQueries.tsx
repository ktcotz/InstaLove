import { Button } from "../../ui/Button";
import { useModal } from "../../ui/modal/ModalContext/useModal";
import { Wrapper } from "../../ui/Wrapper";
import { useUser } from "../authentication/queries/useUser";
import { useClearUserSearch } from "./mutations/useClearUserSearch";

export const ConfirmClearUserQueries = () => {
  const { user } = useUser();
  const { close } = useModal();
  const { clear } = useClearUserSearch(user?.id);

  return (
    <Wrapper modifier="submodal">
      <div className="bg-stone-100 rounded-md shadow-lg p-4 text-center">
        <h2 className="text-stone-950 font-semibold mb-4">
          Wyczyścić historię wyszukiwania?
        </h2>
        <p className="text-stone-600 text-sm mb-8">
          Tej operacji nie będzie można cofnąć. Jeżeli usuniesz historię
          wyszukiwania, możesz nadal oglądać uprzednio wyszukiwane konta w
          proponowanych wynikach.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => {
              clear({ user_id: user?.id });
              close();
            }}
          >
            Wyczyść wszystko
          </Button>
          <Button modifier="all-profiles" onClick={close}>
            Nie teraz
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};
