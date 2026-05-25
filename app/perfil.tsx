import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Switch,
  SafeAreaView,
} from 'react-native';

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface MenuItemProps {
  iconBg: string;
  iconColor: string;
  icon: string; // nome do ícone (substitua por seu lib de ícones)
  title: string;
  subtitle: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showBadge?: boolean;
}

// ─── Constantes de cor ────────────────────────────────────────────────────────

const COLORS = {
  primary: '#C0392B',
  primaryLight: '#FDECEA',
  background: '#FDF5F3',
  white: '#FFFFFF',
  border: '#F0E0DC',
  borderLight: '#F5EDE9',
  textPrimary: '#1A1A1A',
  textSecondary: '#888888',
  textMuted: '#AAAAAA',
  iconBlue: '#2563EB',
  iconBlueBg: '#E8F0FB',
  iconOrange: '#D97706',
  iconOrangeBg: '#FEF3E2',
  iconGreen: '#16A34A',
  iconGreenBg: '#E6F4EA',
  iconGray: '#555555',
  iconGrayBg: '#F0F0F0',
};

// ─── Componente: Ícone placeholder ───────────────────────────────────────────
// Substitua este componente pelo seu provedor de ícones (ex: @expo/vector-icons)

const Icon: React.FC<{ name: string; size?: number; color?: string }> = ({
  name,
  size = 18,
  color = '#000',
}) => (
  // Placeholder — troque por: <Ionicons name={name} size={size} color={color} />
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 4,
      backgroundColor: color + '33',
    }}
  />
);

// ─── Componente: Avatar ───────────────────────────────────────────────────────

const Avatar: React.FC<{ initials: string; onEditPress?: () => void }> = ({
  initials,
  onEditPress,
}) => (
  <View style={styles.avatarWrap}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
    <TouchableOpacity style={styles.avatarEdit} onPress={onEditPress} activeOpacity={0.8}>
      <Icon name="pencil" size={13} color={COLORS.white} />
    </TouchableOpacity>
  </View>
);

// ─── Componente: Card de estatística ─────────────────────────────────────────

const StatCard: React.FC<{ value: number; label: string; isLast?: boolean }> = ({
  value,
  label,
  isLast,
}) => (
  <View style={[styles.stat, !isLast && styles.statBorder]}>
    <Text style={styles.statNum}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// ─── Componente: Item de menu ─────────────────────────────────────────────────

const MenuItem: React.FC<MenuItemProps> = ({
  iconBg,
  iconColor,
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  showBadge,
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.menuIcon, { backgroundColor: iconBg }]}>
      <Icon name={icon} size={18} color={iconColor} />
    </View>
    <View style={styles.menuText}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSubtitle}>{subtitle}</Text>
    </View>
    {showBadge && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>PRO</Text>
      </View>
    )}
    {rightElement ?? (
      <Icon name="chevron-right" size={16} color={COLORS.textMuted} />
    )}
  </TouchableOpacity>
);

// ─── Componente: Título de seção ──────────────────────────────────────────────

const SectionTitle: React.FC<{ children: string }> = ({ children }) => (
  <Text style={styles.sectionTitle}>{children}</Text>
);

// ─── Tela principal: Perfil ───────────────────────────────────────────────────

const ProfileScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Dados do usuário — substitua por dados reais do seu contexto/store
  const user = {
    name: 'Henrique',
    email: 'henrique@email.com',
    initials: 'H',
    savedCount: 47,
    postsCount: 12,
    followingCount: 3,
  };

  const handleLogout = () => {
    // Implemente sua lógica de logout aqui
    console.log('Logout');
  };

  const handleEditProfile = () => {
    // Navegue para a tela de edição
    console.log('Editar perfil');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
        <TouchableOpacity onPress={handleEditProfile} activeOpacity={0.7}>
          <Text style={styles.headerEdit}>Editar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar + Nome */}
        <View style={styles.avatarSection}>
          <Avatar initials={user.initials} onEditPress={handleEditProfile} />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsRow}>
          <StatCard value={user.savedCount} label="Salvos" />
          <StatCard value={user.postsCount} label="Publicações" />
          <StatCard value={user.followingCount} label="Seguindo" isLast />
        </View>

        {/* ── Seção: Conta ── */}
        <SectionTitle>Conta</SectionTitle>
        <View style={styles.card}>
          <MenuItem
            iconBg={COLORS.primaryLight}
            iconColor={COLORS.primary}
            icon="person"
            title="Dados pessoais"
            subtitle="Nome, e-mail, senha"
            onPress={() => console.log('Dados pessoais')}
          />
          <View style={styles.divider} />
          <MenuItem
            iconBg={COLORS.iconBlueBg}
            iconColor={COLORS.iconBlue}
            icon="shield-checkmark"
            title="Privacidade"
            subtitle="Visibilidade e dados"
            onPress={() => console.log('Privacidade')}
          />
          <View style={styles.divider} />
          <MenuItem
            iconBg={COLORS.iconOrangeBg}
            iconColor={COLORS.iconOrange}
            icon="information-circle"
            title="Assinatura"
            subtitle="Plano gratuito"
            onPress={() => console.log('Assinatura')}
            showBadge
          />
        </View>

        {/* ── Seção: Preferências ── */}
        <SectionTitle>Preferências</SectionTitle>
        <View style={styles.card}>
          <MenuItem
            iconBg={COLORS.primaryLight}
            iconColor={COLORS.primary}
            icon="notifications"
            title="Notificações"
            subtitle="Alertas e avisos"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#DDD', true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            }
          />
          <View style={styles.divider} />
          <MenuItem
            iconBg={COLORS.iconGrayBg}
            iconColor={COLORS.iconGray}
            icon="moon"
            title="Tema"
            subtitle="Claro / Escuro"
            onPress={() => console.log('Tema')}
          />
          <View style={styles.divider} />
          <MenuItem
            iconBg={COLORS.iconGreenBg}
            iconColor={COLORS.iconGreen}
            icon="star"
            title="Categorias favoritas"
            subtitle="Tecnologia, Negócios"
            onPress={() => console.log('Categorias')}
          />
        </View>

        {/* ── Seção: Suporte ── */}
        <SectionTitle>Suporte</SectionTitle>
        <View style={styles.card}>
          <MenuItem
            iconBg={COLORS.iconGrayBg}
            iconColor={COLORS.iconGray}
            icon="help-circle"
            title="Ajuda e suporte"
            subtitle="FAQ e contato"
            onPress={() => console.log('Suporte')}
          />
          <View style={styles.divider} />
          <MenuItem
            iconBg={COLORS.iconGrayBg}
            iconColor={COLORS.iconGray}
            icon="flag"
            title="Sobre o app"
            subtitle="Versão 1.0.0"
            onPress={() => console.log('Sobre')}
          />
        </View>

        {/* Botão sair */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Icon name="log-out" size={18} color={COLORS.primary} />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  headerEdit: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },

  // Avatar
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.white,
  },
  avatarEdit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  stat: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  statBorder: {
    borderRightWidth: 0.5,
    borderRightColor: COLORS.border,
  },
  statNum: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },

  // Section title
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    marginBottom: 8,
  },

  // Card
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },

  // Menu item
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  divider: {
    height: 0.5,
    backgroundColor: COLORS.borderLight,
    marginLeft: 64,
  },

  // Badge PRO
  badge: {
    backgroundColor: COLORS.primary,
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 8,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },

  // Logout
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginTop: 4,
    paddingVertical: 14,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 16,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default ProfileScreen;
