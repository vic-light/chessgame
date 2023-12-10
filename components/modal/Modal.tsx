

import "./style.css";


export const Modal = (props: any) => {
    
    const { datap } = props;
    const { onClose } = props;
    
    console.log("input alert data", datap);
    
    const backdropClasses =  'backdrop';
    
    return (
        <div className={backdropClasses} onClick={onClose}>
            <div className="modal" onClick={(event) => event.stopPropagation()}>
                <div className="modal-header">
                    <h3>{datap.title}</h3>
                </div>
                <div className="modal-body">
                    {datap.content}
                </div>
            </div>
        </div>
    );
}
