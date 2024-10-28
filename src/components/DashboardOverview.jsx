import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

import { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import './FinanceDashboard.scss';
import KPI from './kpi.jsx';

// Registrando componentes necessários para o Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const DashboardOverview = () => {
    
    const [financialData, setFinancialData] = useState({
        revenues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        expenses: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        eventsCount: 0 
    });

    // Atualizar um valor específico da receita
    const handleRevenueChange = (index, value) => {
        const updatedRevenues = [...financialData.revenues];
        updatedRevenues[index] = Number(value);
        setFinancialData({ ...financialData, revenues: updatedRevenues });
    };

    // Atualizar um valor específico da despesa
    const handleExpenseChange = (index, value) => {
        const updatedExpenses = [...financialData.expenses];
        updatedExpenses[index] = Number(value);
        setFinancialData({ ...financialData, expenses: updatedExpenses });
    };

    // Atualizar o número total de eventos realizados
    const handleEventsCountChange = (value) => {
        setFinancialData({ ...financialData, eventsCount: Number(value) });
    };

    // Função para calcular as receitas totais
    const calculateTotalRevenue = () => {
        return financialData.revenues.reduce((acc, value) => acc + value, 0);
    };

    // Função para calcular as despesas totais
    const calculateTotalExpenses = () => {
        return financialData.expenses.reduce((acc, value) => acc + value, 0);
    };

    // Função para calcular o lucro total
    const calculateTotalProfit = () => {
        return calculateTotalRevenue() - calculateTotalExpenses();
    };

    // KPIs dinâmicos baseados nos cálculos
    const kpis = [
        { title: 'Receitas', value: `R$ ${calculateTotalRevenue()}`, icon: 'fas fa-chart-line', color: '#4CAF50' },
        { title: 'Despesas', value: `R$ ${calculateTotalExpenses()}`, icon: 'fas fa-coins', color: '#FF6F61' },
        { title: 'Lucro', value: `R$ ${calculateTotalProfit()}`, icon: 'fas fa-dollar-sign', color: '#2196F3' },
        { title: 'Eventos Realizados', value: financialData.eventsCount, icon: 'fas fa-calendar-check', color: '#FF9800' },
    ];

    // Dados para os gráficos
    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
            label: 'Receitas',
            data: financialData.revenues,
            borderColor: '#4CAF50',
            fill: false,
        }],
    };

    const expenseData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
            label: 'Despesas',
            data: financialData.expenses,
            backgroundColor: '#FF6F61',
        }],
    };

    return (
        <div className="dashboard-overview">
            <h2>Visão Geral do Desempenho Financeiro</h2>

            <div className="input-section">
                <h3>Atualizar Receitas</h3>
                {financialData.revenues.map((revenue, index) => (
                    <input
                        key={index}
                        type="number"
                        value={revenue}
                        onChange={(e) => handleRevenueChange(index, e.target.value)}
                        placeholder={`Receita ${index + 1}`}
                    />
                ))}

                <h3>Atualizar Despesas</h3>
                {financialData.expenses.map((expense, index) => (
                    <input
                        key={index}
                        type="number"
                        value={expense}
                        onChange={(e) => handleExpenseChange(index, e.target.value)}
                        placeholder={`Despesa ${index + 1}`}
                    />
                ))}

                <h3>Número de Eventos Realizados</h3>
                <input
                    type="number"
                    value={financialData.eventsCount}
                    onChange={(e) => handleEventsCountChange(e.target.value)}
                    placeholder="Eventos Realizados"
                />
            </div>

            
            <div className="kpi-container">
                {kpis.map((kpi, index) => (
                    <KPI key={index} title={kpi.title} value={kpi.value} icon={kpi.icon} color={kpi.color} />
                ))}
            </div>

            
            <div className="chart-container">
                <h3>Receitas</h3>
                <Line data={revenueData} />
            </div>
            <div className="chart-container">
                <h3>Despesas</h3>
                <Bar data={expenseData} />
            </div>
        </div>
    );
};

export default DashboardOverview;
