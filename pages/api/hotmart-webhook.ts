import type { NextApiRequest, NextApiResponse } from 'next';

const handleHotmartWebhook = async (req: NextApiRequest, res: NextApiResponse) => {
    const eventData = req.body;

    console.log('Evento recebido:', eventData);
    
    // Verificar o tipo de evento e processar adequadamente
    switch (eventData.event) {
        
        case 'PURCHASE_COMPLETE':
            // Processar evento de compra
            break;
        case 'PURCHASE_CANCELED':
            // Processar evento de reembolso
            break;
        case 'SUBSCRIPTION_CANCELLATION':
            // Processar evento de acesso
            break;
        case 'UPDATE_SUBSCRIPTION_CHARGE_DATE':
        // Adicione outros eventos conforme necessário
        case 'PURCHASE_PROTEST':
        // Adicione outros eventos conforme necessário
        case 'PURCHASE_BILLET_PRINTED':
        // Adicione outros eventos conforme necessário
        case 'SWITCH_PLAN':
        // Adicione outros eventos conforme necessário
        case 'PURCHASE_CHARGEBACK':
        // Adicione outros eventos conforme necessário
        case 'PURCHASE_DELAYED':
        // Adicione outros eventos conforme necessário
        case 'PURCHASE_REFUNDED':
        // Adicione outros eventos conforme necessário
        case 'PURCHASE_EXPIRED':
        // Adicione outros eventos conforme necessário
        case 'PURCHASE_APPROVED':
        // Adicione outros eventos conforme necessário
        case 'PURCHASE_OUT_OF_SHOPPING_CART':
        // Adicione outros eventos conforme necessário
        case '':
        // Adicione outros eventos conforme necessário
        case '':
        // Adicione outros eventos conforme necessário
        default:
            console.log('Evento não identificado:', eventData.event);
    }

    res.status(200).json({ message: 'Webhook recebido e processado com sucesso.' });
};

export default handleHotmartWebhook;
